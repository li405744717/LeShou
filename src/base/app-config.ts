//应用参数配置
interface UserInfo {
	USERNAME:string,
	USERID:number
}
export class AppConfig {
	//服务根地址
	public static SERVICE_URL = "http://115.28.67.79:8080/MusicHand_APP/";
	public static IMAGE_URL = ""
	public static DEBUG = true;//是否调试模式，debug模式错误信息输出更加详细
	public static DEVICE = "ios";//设备类型
	public static USERINFO:UserInfo = null;
	public static VERSION = "3.6.97";//版本号
	public static TOASTDURATION = 1000;
	public static SALT = "fengXian"
	public static ISLOGON = false;
	public static TIMEOUT = 8000;
	public static TOKEN = null;

}


