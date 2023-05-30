
const PageContent = ({title, children}) => {
    return <div className='text-center'>
        <h1>{title}</h1>
        {children}
    </div>
}

export default PageContent;
