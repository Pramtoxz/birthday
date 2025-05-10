<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Puzzle Routes
Route::get('/puzzle/first', function () {
    return Inertia::render('Puzzles/FirstPuzzle');
})->name('puzzle.first');

Route::get('/puzzle/second', function () {
    return Inertia::render('Puzzles/SecondPuzzle');
})->name('puzzle.second');

Route::get('/puzzle/third', function () {
    return Inertia::render('Puzzles/ThirdPuzzle');
})->name('puzzle.third');

Route::get('/puzzle/final', function () {
    return Inertia::render('Puzzles/FinalSurprise');
})->name('puzzle.final');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
