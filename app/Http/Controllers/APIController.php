<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\DeviceRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class APIController extends Controller
{
    private $userRepository;
    private $deviceRepository;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(UserRepositoryInterface $userRepository, DeviceRepositoryInterface $deviceRepository)
    {
        $this->middleware('auth:api');

        $this->userRepository = $userRepository;
        $this->deviceRepository = $deviceRepository;
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
}
