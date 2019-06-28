@extends('layouts.app')

@section('content')

    <div class="container">

        <div class="w-100 d-flex justify-content-center">
            {{ $devices->links() }}
        </div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">
                    @if ($orderBy === "id")
                        @if($orderType === "asc")
                            <a href="{{ route("admin_home", ["orderBy" => "id", "orderType" => "desc"]) }}">ID (ASC)</a>
                        @else
                            <a href="{{ route("admin_home", ["orderBy" => "id", "orderType" => "asc"]) }}">ID (DESC)</a>
                        @endif
                    @else
                        <a href="{{ route("admin_home", ["orderBy" => "id", "orderType" => "asc"]) }}">ID</a>
                    @endif
                </th>
                <th scope="col">
                    @if ($orderBy === "imei")
                        @if($orderType === "asc")
                            <a href="{{ route("admin_home", ["orderBy" => "imei", "orderType" => "desc"]) }}">IMEI
                                (ASC)</a>
                        @else
                            <a href="{{ route("admin_home", ["orderBy" => "imei", "orderType" => "asc"]) }}">IMEI
                                (DESC)</a>
                        @endif
                    @else
                        <a href="{{ route("admin_home", ["orderBy" => "imei", "orderType" => "asc"]) }}">IMEI</a>
                    @endif
                </th>
                <th scope="col">
                    @if ($orderBy === "address")
                        @if($orderType === "asc")
                            <a href="{{ route("admin_home", ["orderBy" => "address", "orderType" => "desc"]) }}">Address
                                (ASC)</a>
                        @else
                            <a href="{{ route("admin_home", ["orderBy" => "address", "orderType" => "asc"]) }}">Address
                                (DESC)</a>
                        @endif
                    @else
                        <a href="{{ route("admin_home", ["orderBy" => "address", "orderType" => "asc"]) }}">Address</a>
                    @endif
                </th>
                <th scope="col">
                    @if ($orderBy === "users_count")
                        @if($orderType === "asc")
                            <a href="{{ route("admin_home", ["orderBy" => "users_count", "orderType" => "desc"]) }}">User count
                                (ASC)</a>
                        @else
                            <a href="{{ route("admin_home", ["orderBy" => "users_count", "orderType" => "asc"]) }}">User count
                                (DESC)</a>
                        @endif
                    @else
                        <a href="{{ route("admin_home", ["orderBy" => "users_count", "orderType" => "asc"]) }}">User count</a>
                    @endif
                </th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($devices as $device)
                <tr>
                    <th scope="row">{{ $device->id }}</th>
                    <td>{{ $device->imei }}</td>
                    <td>{{ $device->address }}</td>
                    <td>{{ $device->users_count }}</td>
                    <td><a href="{{route("admin_device", ["id" => $device->id])}}">Edit Users</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="w-100 d-flex justify-content-center">
            {{ $devices->links() }}
        </div>

    </div>

@endsection
