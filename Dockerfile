FROM node:14

# Install OpenSSH and set the password for root to "Docker!". In this example, "apk add" is the install instruction for an Alpine Linux-based image.
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd

# Copy the sshd_config file to the /etc/ssh/ directory
COPY sshd_config /etc/ssh/

# Copy resources
WORKDIR /app
COPY package*.json ./

# Run install
RUN npm install
COPY . .

# Copy startup script and make it executable
COPY startup.sh /bin

# Open port 2222 for SSH access
EXPOSE 8080 2222

RUN chmod 755 /bin/startup.sh

ENTRYPOINT ["/bin/startup.sh"]
