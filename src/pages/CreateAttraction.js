import { Container, Typography, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import { CreateAttractionForm } from '../forms/Attraction/Create';
import CustomIconButton from '../components/common/CustomIconButton';

// ----------------------------------------------------------------------

export default function CreateAttraction() {
  const navigate = useNavigate();

  return (
    <Page title="New Attraction">
      <Container>
        <Stack direction={'row'} justifyContent='flex-start'>
        <CustomIconButton
          onClick={() => {
            navigate('/dashboard/attraction', { replace: true });
          }}
          title="Back to Attraction List"
          color="info.main"
          placement='top'
          icon="eva:arrow-back-outline"
        />
        <Typography variant="h4" gutterBottom>
          New Attraction
        </Typography>
        </Stack>
        <Paper elevation={1} sx={{ padding: 2 }}>
          <CreateAttractionForm />
        </Paper>
      </Container>
    </Page>
  );
}
