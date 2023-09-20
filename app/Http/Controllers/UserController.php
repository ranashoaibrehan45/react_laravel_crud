<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image as ResizeImage;
use Log;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        if ($request->file('photo')) {
            $oldPhoto = $user->photo;
            $path = $request->file('photo')->store('public/avatars');
            $user->photo = last(Str::of($path)->explode('/')->toArray());
            $user->save();

            // resize image
            $name = '128x128-'.$user->photo;
            ResizeImage::make($request->file('photo'))
                ->resize(128, 128)
                ->save(storage_path('app/public/avatars/'.$name));
        }

        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        if ($request->file('photo')) {
            $oldPhoto = $user->photo;
            $path = $request->file('photo')->store('public/avatars');
            $user->photo = last(Str::of($path)->explode('/')->toArray());
            $user->save();

            // resize image
            $name = '128x128-'.$user->photo;
            ResizeImage::make($request->file('photo'))
                ->resize(128, 128)
                ->save(storage_path('app/public/avatars/'.$name));

            // Delete the old photo
            if ($oldPhoto) {
                Storage::delete('public/avatars/'.$oldPhoto);
                Storage::delete('public/avatars/128x128-'.$oldPhoto);
            }
        }

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response('', 204);
    }
}
