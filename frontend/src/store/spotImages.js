import { csrfFetch } from './csrf';

// regular actions
const Add_IMAGES = 'spots/:id/addImages';

// const addImages = (imageUrls, spotId) => {
//     return {
//         type: HOLD_IMAGES,
//         payload: { imageUrls, spotId}
//     }
// };


// thunk actions
export const addImages = (imageUrls, spotId) => async () => {
    console.log('add image thunk ---- ')
    console.log('imageUrls', imageUrls)
    console.log('spotid', spotId)
    imageUrls.forEach(async (imageUrl) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                url: imageUrl.url.slice(5),
                preview: imageUrl.preview
            })
        }

        const response = await csrfFetch(`/api/spots/${spotId}/images`, options);

        if (response.ok) {
            const data = await response.json();
            console.log('response ok - data', data)
            return data;
        }
    })
}

const initalState = {};

const spotsImageReducer = (state = initalState, action) => {
    // console.log(action)
    console.log('*spotImage reducer: current state ------------ ', state)
    let newState;
    switch (action.type) {
        // case HOLD_IMAGES: {
        //     console.log('HOLD_IMAGES')
        //     newState = { ...state }
        //     newState.allSpots = action.imageUrls
        //     return newState;
        // }
        default: {
            // console.log('spots reducer DEFAULT')
            return state;
        }
    }
};

export default spotsImageReducer;
