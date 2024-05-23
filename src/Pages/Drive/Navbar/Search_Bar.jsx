import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { api } from '../../../Components/axios/api';
import { setFiles, setFolders } from '../../../redux/Slice/searchSlice';

const Search_Bar = () => {
    const navigate = useNavigate()
    // write a function that will handle the search
    const dispatch = useDispatch()
    const [text, setText] = React.useState("")
    const [type, setType] = useState("files")
    const handleSearch = async () => {
        if (!text) {
            return
        }
        try {
            if (type === "files") {
                const result = await api.post(`/file/search`, {
                    search: text
                })
                dispatch(setFiles(result.data))
                dispatch(setFolders([]))
            }
            else if (type === "folders") {
                const result = await api.post(`/folder/search`, {
                    search: text
                })
                dispatch(setFolders(result.data))
                dispatch(setFiles([]))
            }
        } catch (error) {

        }
    }
    return (
        <div contextMenu={"false"} className='w-[721.60px] h-[47.60px] bg-white rounded-2xl overflow-hidden flex items-center pl-3 shadow'>
            <FontAwesomeIcon icon={faMagnifyingGlass} height={14} />
            <input type="text"
                onClick={(e) => {
                    e.preventDefault()
                    navigate('/drive/search')
                }}
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                }}
                className='w-full h-full pl-3 outline-none bg-white'
                placeholder='Search in drive'
            />
            <select onChange={(e) => setType(e.target.value)} className="select select-ghost w-full max-w-[120px] outline-none focus:outline-none border-none"
                value={type}
            >
                <option value={"files"}>Files</option>
                <option
                    value={"folders"}
                >Folders</option>
            </select>
            <button onClick={(e) => {
                handleSearch()
            }} className='btn hover:shadow btn-primary rounded-none'>Search</button>
        </div>
    );
};

export default Search_Bar;