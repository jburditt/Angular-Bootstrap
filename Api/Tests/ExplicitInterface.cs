// Internal type that cannot be exposed publicly
using System.Collections;

internal class InternalConfiguration
{
    public string Setting { get; set; } = "";
}

// Internal interface that CAN be implemented with public members
// because it only uses public types in its signature
internal interface ILoggable
{
    void Log(string message); // string is public, so this works with implicit implementation
}

// Interface with internal accessibility using internal types
internal interface IConfigurable
{
    void Configure(InternalConfiguration config); // Internal type prevents implicit implementation
}

// This class shows both implicit and explicit interface implementation
public class ServiceImplementation : ILoggable, IConfigurable, IEnumerable<string>
{
    // Implicit implementation works for ILoggable because string is public
    public void Log(string message)
    {
        Console.WriteLine($"Log: {message}");
    }

    // Explicit implementation required for IConfigurable because it uses internal types
    void IConfigurable.Configure(InternalConfiguration config)
    {
        // Implementation here
        Console.WriteLine($"Configured with: {config.Setting}");
    }

    IEnumerator<string> IEnumerable<string>.GetEnumerator()
    {
        yield return "ServiceImplementation";
    }

    public IEnumerator GetEnumerator()
    {
        throw new NotImplementedException();
    }
}