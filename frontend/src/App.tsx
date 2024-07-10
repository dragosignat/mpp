import {RouterProvider} from 'react-router-dom';
import router from './router/routes';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {QueryClientProvider} from '@tanstack/react-query';
import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
