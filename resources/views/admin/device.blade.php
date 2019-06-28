@extends('layouts.app')

@section('content')

    <div class="container text-center">
        <h1 class="my-5">{{$device->name}} Users:</h1>
        <table class="table text-left">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($users as $user)
                <tr>
                    <th scope="row">{{ $user->id }}</th>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>
                        <a href="{{ route("admin_device_user_remove", ["id" => $device->id, "userID" => $user->id])}}">
                            Remove
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <a href="{{route("admin_home_redirect")}}">Go Back</a>
    </div>

@endsection
