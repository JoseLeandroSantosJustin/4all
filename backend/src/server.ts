import app from './app';
import config from 'config';

const port = config.get('node').port || 3000;

app.listen(port, () => {
  console.log(`Rental store API is running on port ${port}`);
});
