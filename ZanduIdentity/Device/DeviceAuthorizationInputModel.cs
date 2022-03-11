using ZanduIdentity.Consent;

namespace ZanduIdentity.Device
{
    public class DeviceAuthorizationInputModel : ConsentInputModel
    {
        public string UserCode { get; set; }
    }
}