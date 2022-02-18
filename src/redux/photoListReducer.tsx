const stateDefault = {
    photoList: [],
    photoListSave:[]
}

export const photoListReducer = (state = stateDefault, action: any) => {
    switch (action.type) {
        case 'get_data': {
            state.photoList = action.data;
            state.photoListSave = action.data;
            return { ...state }
        }
        case 'change_data': {
            var index = state.photoList.findIndex((item: any) => item.id = action.dataChange.id);
            var newPhotoList: any = [...state.photoList]
            if (index !== -1) {
                newPhotoList[index] = action.dataChange
            }
            return { ...state }
        }
        default: return { ...state }
    }
}
