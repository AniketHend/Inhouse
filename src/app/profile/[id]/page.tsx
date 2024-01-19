export default function UserProfilePage({ params }: any) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-4xl">Profile
                <span
                    className="p-2 ml-2 rounded text-black bg-orange-600"
                >{params.id}
                </span>
            </h1>
        </div>
    );
}