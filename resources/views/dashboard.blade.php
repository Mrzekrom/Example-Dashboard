@extends('layouts.dashboard')

@section('content')
    @include('dashboard.hero')

    @include('dashboard.overview')

    @include('dashboard.performance')

    @include('dashboard.projects')
@endsection
