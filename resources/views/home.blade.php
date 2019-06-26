@extends('layouts.app')

@section('content')
<div class="container-fluid" id="dashboard" jwt_token="{{$token}}" google_key="{{$googleAPIKey}}">
    <noscript>Enable Javascript!</noscript>
</div>
@endsection
