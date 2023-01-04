import { DataSource, DataSourceOptions } from 'typeorm';
import { dbConfig } from '../../config/db';

const dataSource = new DataSource(dbConfig as DataSourceOptions);

export default dataSource;
