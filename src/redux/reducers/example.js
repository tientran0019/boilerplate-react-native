/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-01-30 15:04:02
 *-------------------------------------------------------*/
import { fromJS } from 'immutable';

import { spliceOne } from 'src/utils';

import { MODEL_NAME } from 'src/redux/actions/example';

export const initialState = fromJS({
	list: {
		total: 0,
		skip: 0,
		limit: 12,
		data: [],
	},
	view: {
	},
});

export default (state = initialState, action) => {
	switch (action.type) {
		case `GET_${MODEL_NAME}_LIST_REQUEST`:
			return state.update('list', () => {
				return initialState.get('list').toJS();
			});

		case `GET_${MODEL_NAME}_LIST_SUCCESS`: {
			return state.update('list', (list) => {
				return {
					...action.payload,
					data: [...list.data, ...action.payload.data],
					loading: false,
				};
			});
		}

		case `GET_${MODEL_NAME}_DATA_REQUEST`:
			return state.update('view', () => {
				return initialState.get('view').toJS();
			});

		case `GET_${MODEL_NAME}_DATA_SUCCESS`:
			return state.update('view', () => {
				return {
					...action.payload,
					loading: false,
				};
			});

		case `UPDATE_${MODEL_NAME}_SUCCESS`: {
			return state.update('list', (list) => {
				const { id } = action.payload;

				if (list.data) {
					const index = list.data.findIndex((row) => {
						return row.id === id;
					});

					if (index >= 0) {
						list.data[index] = { ...list.data[index], ...action.payload }; // eslint-disable-line
					}
					return { ...list, data: [...list.data] };
				}

				return initialState.get('list').toJS();
			}).update('view', () => {
				return { ...action.payload };
			});
		}

		case `DELETE_${MODEL_NAME}_SUCCESS`: {
			return state.update('list', (list) => {
				const { id } = action.payload;

				if (list.data) {
					const index = list.data.findIndex((row) => {
						return row.id === id;
					});

					if (index >= 0) {
						spliceOne(list.data, index);
						list.total = list.total - 1; // eslint-disable-line
						list.skip = list.skip - 1; // eslint-disable-line
					}

					return { ...list, data: [...list.data] };
				}

				return initialState.get('list').toJS();
			}).update('view', () => {
				return {};
			});
		}

		default:
			return state;
	}
};
