export {
    getArtists,
    saveArtist,
    getArtistById,
    deleteArtistById,
    updateArtistById,
    getArtistsFiltered,
    getArtistsPaged
} from './artist';

export {
    getRecords,
    saveRecord,
    getRecordById,
    deleteRecordById,
    updateRecordById,
    getRecordsFiltered,
    getRecordsPaged,
    setFilter
} from './record';

export {
    getNationalities,
    saveNationality
} from './nationality';

export {
    getFormats,
    saveFormat
} from './format';

export {
    getStyles,
    saveStyle
} from './style';

export {
    getRecordsTest
} from './test';

export {
    auth,
    logout,
    authCheckState
} from './auth';

export {
    setForm
} from './form';