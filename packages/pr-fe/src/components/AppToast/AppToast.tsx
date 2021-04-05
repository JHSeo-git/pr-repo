import 'react-toastify/dist/ReactToastify.min.css';

import { ToastContainer } from 'react-toastify';

export type AppToastProps = {};

function AppToast(props: AppToastProps) {
  return (
    <ToastContainer
      limit={2000}
      position="top-right"
      pauseOnHover
      pauseOnFocusLoss={false}
      closeButton={false}
    />
  );
}

export default AppToast;
