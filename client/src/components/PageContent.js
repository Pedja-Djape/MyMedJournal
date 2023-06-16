import { Dna } from 'react-loader-spinner';

const PageContent = ({ title, children }) => {
  return (
    <div className='flex flex-col items-center text-center pt-10 text-white'>
        <div className='flex items-center'>
                <div className=' rotate-90'><Dna /></div> 
                <h1 className=' px-4'>{title}</h1>
                <div className=' rotate-90'><Dna /></div> 
        </div>
    <div>
        {children}
    </div>
    </div>
  );
};

export default PageContent;
