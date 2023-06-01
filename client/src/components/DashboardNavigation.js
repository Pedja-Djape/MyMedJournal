import { Sidebar, Menu, MenuItem,  } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const DashboardNavigation = () => {
  return (
    <>
    <div style={{paddingTop: '3rem'}}>
        <Sidebar>
                <Menu>
                    <MenuItem component={<Link to='' />}>No-Op</MenuItem>
                </Menu>
            </Sidebar>
    </div>
        
    </>
  )
}

export default DashboardNavigation

