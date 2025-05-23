# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs


FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Mayuukha.Server/Mayuukha.Server.csproj", "Mayuukha.Server/"]
COPY ["mayuukha.client/mayuukha.client.esproj", "mayuukha.client/"]
RUN dotnet restore "./Mayuukha.Server/Mayuukha.Server.csproj"
COPY . .

# Ensure the target directory for the certificate exists and has correct permissions
RUN mkdir -p /root/.aspnet/https && chmod -R 755 /root/.aspnet/https

# Install client dependencies and build client project
WORKDIR /src/mayuukha.client
COPY ["mayuukha.client/package.json", "mayuukha.client/"]
COPY ["mayuukha.client/vite.config.ts", "mayuukha.client/"]
RUN npm install
RUN npm run build

WORKDIR "/src/Mayuukha.Server"
RUN dotnet build "./Mayuukha.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet restore "./Mayuukha.Server.csproj"
RUN dotnet publish "./Mayuukha.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false --verbosity detailed

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mayuukha.Server.dll"]
