import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
    private storedFiles: string[] = [];

    public saveFile(file: string): Promise<string> {
        this.storedFiles.push(file);

        return Promise.resolve(file);
    }

    public deleteFile(file: string): Promise<void> {
        const foundIndex = this.storedFiles.findIndex(
            storedFile => storedFile === file,
        );

        this.storedFiles.splice(foundIndex, 1);

        return Promise.resolve();
    }
}
