import axios from "axios";
import { useState } from "react";

export default function PhotosUploader(){
    const [photoLink,setphotoLink] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    async function addPhotoBylink(ev){
        ev.preventDefault();
        const {data:filename} = await axios.post('/upload-by-link', {link:photoLink})
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setphotoLink('');
    }
    function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
        
        axios.post('/upload', data, {
            headers: {"Content-Type":'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            })
        })
    }
    return (
        <>
            <div className="flex gap-2">
                <input value={photoLink}
                onChange={ev => setphotoLink(ev.target.value)}
                type="text" placeholder="Add using a link...jpg/jpeg" />
                <button onClick={addPhotoBylink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex" key={link}>
                        <img className="rounded-2xl w-full object-cover" src={"http://localhost:4001/uploads/"+link} alt="" />
                    </div>
                ))}

                <label className=" h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-gray-600 text-2xl">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                </label>
            </div>
        </>
    );
}