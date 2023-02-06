import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// material
import { Card, Stack, Container, Typography, Menu, MenuItem, Button, Box } from '@mui/material';

// toast
import { toast } from 'react-toastify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// components
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme, styled } from '@mui/material/styles';
import Label from '../components/Label';
import { ActiveOrDeleteForm } from '../forms/User';
import { getAttractions, removeAttraction } from '../services/attraction.service';
import Page from '../components/Page';
import LoadingIndicator from '../components/common/LoadingSpinner';

import CustomModal from '../components/common/CustomModal';
import CustomIconButton from '../components/common/CustomIconButton';
import Iconify from '../components/common/Iconify';
import { EditForm } from '../forms/User/Edit';
import { ROLES } from '../utils/constants';
import { MAvatar } from '../components/@material-extend';
import createAvatar from '../utils/createAvatar';
import useSettings from '../hooks/useSettings';
import { PATH_DASHBOARD } from '../routes/paths';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { fDateTime, fDateTimeSuffix } from '../utils/formatTime';

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm,
}));

// function RenderRole(getRole) {
//   const theme = useTheme();
//   const isLight = theme.palette.mode === 'light';
//   return (
//     <Label
//       variant={isLight ? 'ghost' : 'filled'}
//       color={(getRole === 'User' && 'warning') || (getRole === 'Admin' && 'success') || 'error'}
//       sx={{ textTransform: 'capitalize', mx: 'auto' }}
//     >
//       {getRole}
//     </Label>
//   );
// }

export default function Attraction() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [attractions, setAttractions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [multiSelectAnchorEl, setMultiSelectAnchorEl] = useState(null);
  const open = Boolean(multiSelectAnchorEl);

  const onErrorLoadImage = (e) => {
    e.target.src = '/static/icons/icon.png';
    e.target.onerror = null;
  };

  const userColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      renderCell: (params) => {
        const getCoverImage = params.getValue(params.id, 'cover_image');
        const getName = params.getValue(params.id, 'name');

        return (
          <Box
            sx={{
              py: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ThumbImgStyle src={getCoverImage} alt={getName} onError={onErrorLoadImage} />
            <Typography variant="subtitle2" noWrap>
              {getName}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'canton',
      headerName: 'Canton',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Created at',
      valueGetter: (params) => fDateTimeSuffix(params.row.created_at),
      flex: 1,
    },
    {
      field: 'position',
      headerName: 'Position',
      valueGetter: (params) => `[${params.row.latitude} , ${params.row.longitude} ]`,
      flex: 0.8,
      filterable: false,
      sortable: false,
      hide: true,
    },

    {
      field: 'actions',
      headerName: 'Actions',
      filterable: false,
      disableExport: true,
      sortable: false,
      flex: 0.7,
      minWidth: 100,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <Stack alignItems={'center'} direction="row" width={'100%'} justifyContent={'center'}>
            <>
              <CustomIconButton
                onClick={() => {
                  navigate(PATH_DASHBOARD.attraction.edit.replace(':id', id));
                }}
                title="Edit"
                color="primary.main"
                icon="eva:edit-2-outline"
              />
              <CustomIconButton
                onClick={async () => {
                  const response = await removeAttraction(id);
                  showToastMessage(response.status === 200, {
                    success: 'Attraction successfully deleted',
                    error: 'Error on delete Attraction, please try again',
                  });
                  fetchAttractions();
                }}
                title="Delete"
                color="error.main"
                icon="eva:trash-outline"
              />
            </>
          </Stack>
        );
      },
    },
  ];

  // const multipleUserActions = [
  //   {
  //     label: 'Edit',
  //     icon: 'eva:edit-2-outline',
  //     color: 'secondary.main',
  //     onClick: () => {
  //       resetEdit({ userId: selectedUsers, role: '' });
  //       handleMenuOptionsClose();
  //       setOpenEditModal(true);
  //     },
  //   },
  //   {
  //     label: 'Delete',
  //     icon: 'eva:trash-2-outline',
  //     color: 'error.main',
  //     onClick: () => {
  //       reset({ userId: selectedUsers });
  //       setCountUsersDelete(selectedUsers.length);
  //       handleMenuOptionsClose();
  //       setOpenDeleteModal(true);
  //     },
  //   },
  // ];

  const showToastMessage = (isSuccessful, messages) => {
    const messageToShow = isSuccessful ? messages.success : messages.error;
    toast(messageToShow, { type: isSuccessful ? 'success' : 'error' });
  };

  const fetchAttractions = async () => {
    const attractions = (await getAttractions())?.data;
    if (attractions) setAttractions(attractions);
    setLoading(false);
  };

  // const handleMenuOptionsClick = (event) => {
  //   setMultiSelectAnchorEl(event.currentTarget);
  // };

  // const handleMenuOptionsClose = () => {
  //   setMultiSelectAnchorEl(null);
  // };

  useEffect(() => {
    fetchAttractions();
  }, []);

  return (
    <Page title="Attraction">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Attraction List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Attraction', href: PATH_DASHBOARD.attraction.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.attraction.newAttraction}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Attraction
            </Button>
          }
        />
        <Card>
          <div style={{ display: 'flex', height: '70vh' }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={attractions}
                loading={isLoading}
                columns={userColumns}
                getRowId={(user) => user.id}
                pageSize={rowsPerPage}
                onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
                rowsPerPageOptions={[10, 20, 50]}
                onSelectionModelChange={(usersSelected) => {
                  setSelectedUsers(usersSelected);
                }}
                pagination
                checkboxSelection
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
                getRowHeight={() => 'auto'}
              />
            </div>
          </div>
        </Card>
      </Container>
    </Page>
  );
}
