"use client";

export default function ErrorResetPassword({error}: {error: Error}){
    return <div>
        {error.message}
    </div>
}