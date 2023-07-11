interface ProviderInterface {
  connect: () => Promise<string>;
  disconnect: () => Promise<boolean>;
}
