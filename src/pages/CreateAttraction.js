import { Container, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
// components
import { useLocation, useParams } from 'react-router-dom';
import Page from '../components/Page';
import { CreateAttractionForm } from '../forms/Attraction/Create';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../routes/paths';
import useSettings from '../hooks/useSettings';
import { getAttraction } from '../services/attraction.service';

// ----------------------------------------------------------------------

export default function CreateAttraction() {
  const [currentAttraction, setCurrentAttraction ] = useState();
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');

  useEffect(()=>{
    const fetchCurrentAttraction = async (id) =>
    {
      if(isEdit){
      const attractions = await getAttraction(id)
      setCurrentAttraction(attractions.data);
    }
    }

    fetchCurrentAttraction(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Page title="Create Attraction">
        <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Create Attraction" : "Edit Attraction"}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Attraction', href: PATH_DASHBOARD.attraction.root },
            { name: !isEdit ? 'Create': id  },
            ]}
        />
        <Paper elevation={1} sx={{ padding: 2 }}>
          <CreateAttractionForm isEdit={isEdit} attraction={currentAttraction}/>
        </Paper>
      </Container>
    </Page>
  );
}
