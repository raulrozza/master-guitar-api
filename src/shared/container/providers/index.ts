import { container } from 'tsyringe';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton('StorageProvider', DiskStorageProvider);
