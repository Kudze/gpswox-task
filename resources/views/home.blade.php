@extends('layouts.app')

@section('content')
<div class="container-fluid" id="dashboard" jwt_token="{{$token}}">
    <noscript>Enable Javascript!</noscript>
</div>
@endsection
