@extends('layouts.app')

@inject('geo', 'App\Services\GeoInterface')

@section('content')

    <div class="container">

        <div class="w-100 d-flex justify-content-center">
            {{ $devices->links() }}
        </div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">IMEI</th>
                <th scope="col">Address</th>
                <th scope="col">User count</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($devices as $device)
                <tr>
                    <th scope="row">{{ $device->id }}</th>
                    <td>{{ $device->imei }}</td>
                    <td>{{ $device->address }}</td>
                    <td>{{ $device->users()->count() }}</td>
                    <td>edit</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="w-100 d-flex justify-content-center">
            {{ $devices->links() }}
        </div>

    </div>

@endsection
