import React, { useState } from 'react';
import './FolderStructure.css'
import { FcPlus } from "react-icons/fc";
import { useQuery } from 'react-query';
import { GoTrashcan, IconName } from "react-icons/go";
const FolderStructure = () => {
    const [modal, setModal] = useState(false);
    const {data:folders=[],isLoading,refetch}=useQuery({
        queryKey:['folders'],
        queryFn:()=>fetch(`http://localhost:5000/folders`)
        .then(res=>res.json())

    });
    console.log(folders);
    const handelDelete=(id)=>{
        console.log(id);
        fetch(`http://localhost:5000/folders/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            refetch();
        })
    }
    const handelLogin=event=>{
        event.preventDefault();
        const form=event.target;
        const name=form.name.value;
        console.log(name);
        setModal(!modal);
        const folder={
            name:name
        }
        fetch('http://localhost:5000/folder',{
            method:'POST',
           headers:{
            'content-type':'application/json',
           },
           body:JSON.stringify(folder),
        }).then(res=>res.json())
        .then(result=>{
            refetch();
        });
    }
    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='folder-structure'>
            <h1>Folder Structure</h1>
            <div className='folders'>
                <p>Root</p>
                <div className='folder-add'>
                    <p>new </p><button onClick={toggleModal} className="btn-modal"><FcPlus size="25px"></FcPlus></button>
                </div>
            </div>
            <div className=''>
               {
                folders.map(folder=>
                    <div className='folders'>
                        <p>{folder.name}</p>
                       <button onClick={()=>handelDelete(folder._id)} style={{backgroundColor:'#ffffff', border:'0'}}><GoTrashcan size="25px"></GoTrashcan></button>
                    </div>
                )
               }
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Add Folder</h2>
                        <form onSubmit={handelLogin}>
                            <input type="text" placeholder='Name' name='name' className='input' />
                            <button className='input-btn'>Add</button>
                        </form>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FolderStructure;