/**
 * 配置项声明
 */
interface DevConfig {
}
interface ProdConfig {
}
interface ConfigMap {
    [k: string]: DevConfig | ProdConfig
    development: DevConfig,
    production: ProdConfig
}

/**
 * 配置项
 */
const devConfig = {
}
const prodConfig = {
}

const configMap: ConfigMap = {
    "development": devConfig,
    "production": prodConfig
}

export default configMap[process.env.NODE_ENV]