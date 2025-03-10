import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:openapi/api.dart';

final apiServiceProvider = Provider((ref) => ApiService());

class ApiService {
  late ApiClient _apiClient;

  late UserApi userApi;
  late AuthenticationApi authenticationApi;
  late AlbumApi albumApi;
  late AssetApi assetApi;
  late ServerInfoApi serverInfoApi;
  late DeviceInfoApi deviceInfoApi;

  setEndpoint(String endpoint) {
    _apiClient = ApiClient(basePath: endpoint);

    userApi = UserApi(_apiClient);
    authenticationApi = AuthenticationApi(_apiClient);
    albumApi = AlbumApi(_apiClient);
    assetApi = AssetApi(_apiClient);
    serverInfoApi = ServerInfoApi(_apiClient);
    deviceInfoApi = DeviceInfoApi(_apiClient);
  }

  setAccessToken(String accessToken) {
    _apiClient.addDefaultHeader('Authorization', 'bearer $accessToken');
  }
}
