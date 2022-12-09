import PropTypes from 'prop-types';
// material
import {
  Box,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  FormControlLabel,
  Badge,
} from '@mui/material';
// components
import Iconify from '../../../components/common/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { CANTON_LABELS } from '../../../utils/constants';
import BlogPostsSearch from '../blog/BlogPostsSearch';

// ----------------------------------------------------------------------

export const FILTER_CANTON_OPTIONS = CANTON_LABELS;
// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  return (
    <>
      <Badge badgeContent={4} color="primary">
        <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
          Filters&nbsp;
        </Button>
      </Badge>
      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
          <div>
            <Typography variant="subtitle2" gutterBottom>
                Attraction Name
              </Typography>
              <BlogPostsSearch posts={[]} />
            </div>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_CANTON_OPTIONS.map((item) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
              </FormGroup>
            </div>
            <div>
              <Button fullWidth size="lage" type="submit" variant="contained" color="primary">
                Apply
              </Button>
            </div>

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="button"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
