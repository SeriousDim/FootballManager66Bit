import {AppBar, Box, Button, Container, Toolbar, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {AppRoutes} from '../../const/routes';

/**
 * Хедер с переключателями страниц
 * @constructor
 */
export function Header() {
  const navigate = useNavigate();

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 4,
              fontWeight: 500,
              color: 'inherit'
            }}
          >
            Каталог футболистов 3.0
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <Button
              sx={{mx: 1, color: 'white', display: 'block'}}
              onClick={() => {
                navigate(AppRoutes.LIST);
              }}>
              Список
            </Button>
            <Button
              sx={{mx: 1, color: 'white', display: 'block'}}
              onClick={() => {
                navigate(AppRoutes.ADD);
              }}>
              Добавить футболиста
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
