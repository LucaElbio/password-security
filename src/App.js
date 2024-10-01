import './App.css';
import SecurityLevel from './components/SecurityLevel';
import { Grid2 } from '@mui/material';

function App() {
  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#141313"}}
      style={{ minHeight: '100vh'}} // Esto asegura que el contenido ocupe toda la altura de la ventana
    >
      <SecurityLevel />
    </Grid2>
  );
}


export default App;
