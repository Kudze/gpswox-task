<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Psr\Log\InvalidArgumentException;
use Spatie\Permission\Models\Role;

class GiveAdminRole extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'role:set-admin {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gives user an admin role';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $email = $this->argument("email");

        $user = User::where(["email" => $email])->first();

        if ($user === null)
            $this->error("Email is invalid!");

        else {
            $webAdmin = Role::firstOrCreate(['guard_name' => 'web', 'name' => 'admin']);
            $apiAdmin = Role::firstOrCreate(['guard_name' => 'api', 'name' => 'admin']);
            $user->assignRole($webAdmin);
            $user->assignRole($apiAdmin);

            $this->info("Success!");
        }
    }
}
