import { Link, useParams } from "react-router-dom";

export default function PlacesPage(){
    const {action} = useParams();


    return (
        <div>
            {action != 'new' && (
                <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    Add New Place
                </Link>
            </div>
            )}
            
        </div>
    );
}