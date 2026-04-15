import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { TipoUsuario } from "../types/Usuario";

const settingsLogged = ["Perfil", "Logout"];

function getPagesForRole(role: TipoUsuario | null) {
  if (!role) {
    return [{ label: "Home", path: "/" }];
  }

  const base = [
    { label: "Home", path: "/" },
    { label: "Serviços", path: "/servicos" },
    { label: "Agendamentos", path: "/agendamentos" },
  ];

  if (role === TipoUsuario.ADMIN) {
    return [
      ...base,
      { label: "Usuários", path: "/usuarios" },
      { label: "Produtos", path: "/produtos" },
    ];
  }

  return base;
}

function ResponsiveAppBar() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const pages = getPagesForRole(auth.user?.tipo ?? null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleUserAction = (setting: string) => {
    handleCloseUserMenu();
    if (setting === "Logout") {
      auth.logout();
      navigate("/login");
      return;
    }
    if (setting === "Perfil" && auth.user) {
      navigate(`/usuarios/${auth.user.id}`);
    }
  };

  const userInitials = auth.user
    ? auth.user.nome
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
    : "";

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ContentCutIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handleNavigate(page.path)}>
                  <Typography>{page.label}</Typography>
                </MenuItem>
              ))}
              {!auth.isAuthenticated && (
                <MenuItem onClick={() => handleNavigate("/login")}>
                  <Typography>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <ContentCutIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              cursor: "pointer",
            }}
          >
            SALÃO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigate(page.path)}
                sx={{ my: 2, color: "white" }}
              >
                {page.label}
              </Button>
            ))}
            {!auth.isAuthenticated && (
              <Button onClick={() => handleNavigate("/login")} sx={{ my: 2, color: "white" }}>
                Login
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={auth.user ? auth.user.nome : "Acessar"}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar>{auth.user ? userInitials : "?"}</Avatar>
              </IconButton>
            </Tooltip>

            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
              {auth.isAuthenticated ? (
                settingsLogged.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleUserAction(setting)}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={() => handleNavigate("/login")}>
                  <Typography>Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
