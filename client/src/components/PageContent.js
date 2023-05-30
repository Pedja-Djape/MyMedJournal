
const PageContent = ({title, children}) => {
    return <div className='text-center pt-10 text-5xl text-white'>
        <h1>{title}</h1>
        {children}
    </div>
}

export default PageContent;
