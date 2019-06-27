<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\User;
use App\Repositories\DeviceRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use App\Services\IMEIValidator;
use App\Services\IMEIValidatorInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//If project was bigger i would make APIController abstract with genError as protected func.
//But this project is small so its fine.
class APIController extends Controller
{
    private $userRepository;
    private $deviceRepository;
    private $IMEIValidator;

    private function genError($err) {
        return response()->json(
            [
                "err" => $err
            ],
            401
        );
    };

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
        UserRepositoryInterface $userRepository,
        DeviceRepositoryInterface $deviceRepository,
        IMEIValidatorInterface $IMEIValidator
    ) {
        $this->middleware('auth:api');

        $this->userRepository = $userRepository;
        $this->deviceRepository = $deviceRepository;
        $this->IMEIValidator = $IMEIValidator;
    }

    /**
     * Retrieves all user devices.
     */
    public function retrieveUserDevices()
    {
        /** @var User $user */
        $user = Auth::user();
        $data = $this->userRepository->getUserDevices(
            $user
        );

        return response()->json(
            $data
        );
    }

    /**
     * Retrieves device info
     */
    public function retrieveDeviceInfo($id)
    {
        $device = Device::find($id);

        if($device === null) return $this->genError('ID is invalid');

        $imei = $this->deviceRepository->getClosestDeviceIMEITo(
            $device->latitude,
            $device->longitude
        );

        return response()->json(
            [
                'imei' => $imei
            ]
        );
    }

    public function toggleDeviceActive($id, $active)
    {
        $user = Auth::user();
        $device = Device::find($id);

        if($device === null) return $this->genError('ID is invalid');

        $device->users()->updateExistingPivot(
            $user->id,
            ['active' => $active]
        );

        return response()->json(
            []
        );
    }

    public function updateOrCreateDevice(Request $request) {
        $user = Auth::user();

        $name = $request->get("name", null);
        $imei = $request->get("imei", null);
        $lat = $request->get("lat", null);
        $lng = $request->get("lng", null);

        if($name === null) return $this->genError("Name was not provided!");
        if(strlen($name) > 64) return $this->genError("Name is too long!");
        if($imei === null) return $this->genError("IMEI was not provided!");
        if(!$this->IMEIValidator->isIMEIValid($imei)) return $this->genError("IMEI is invalid!");
        if($lat === null) return $this->genError("Latitude was not provided!");
        if($lng === null) return $this->genError("Longitude was not provided!");

        if(!$user->hasRole('admin'))
        {
            $device = Device::where('imei', $imei)->first();

            if($device !== null && $device->users()->where('id', $user->id) === null)
                return $this->genError("This IMEI is already registered to our service. You're not authorized to add it to your account!");
        }

        $device = Device::updateOrCreate(
            ["imei" => $imei],
            ["name" => $name, "latitude" => $lat, "longitude" => $lng]
        );

        //We want to attach device to user.
        //sync function doesn't create already existing attachments in many to many relationship.
        $user->devices()->sync([$device.id], false);

        return response()->json(
            [
                "device" => $device
            ]
        );
    }
}
