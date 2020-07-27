import { get, defaultTo } from 'lodash';

const GetByPathWithDefault = (data, path, defaultValue) => defaultTo(get(data, path), defaultValue);

export default GetByPathWithDefault;
