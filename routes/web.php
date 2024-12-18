<?php
// use File;
use Illuminate\Support\Facades\Route;

Route::get('/', function (){
    return redirect('/app');
    // return File::get(public_path() . '/app/index.html');
});
