import React from 'react';
import { icons } from '../../../Components/Icons/IconProvider';
import CategoryCard from './_Ui/CategoryCard';
import RecentFolders from './_SUB/RecentFolders';
import Files from './_SUB/Files';
import { FilesTable } from './_SUB/FilesTable';


const Home = () => {
    return (
        <div className='lg:px-5 w-full'>
            <section className='flex gap-7 flex-wrap lg:justify-start justify-center '>
                {
                    icons.map((icon, index) => {
                        return (
                            <CategoryCard key={index} icon={icon} />
                        )
                    })
                }
            </section>

            <RecentFolders />
            <Files />
            <FilesTable /> 
        </div>
    );
};

export default Home;
// Home js