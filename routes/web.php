<?php
// use File;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function (){
    return file_get_contents(public_path('index.html')); // Tampilkan index.html
})->where('any', '.*');
