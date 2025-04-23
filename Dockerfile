FROM node:23

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
# Copy rest of app
COPY . .

# Set environment variable port
ENV PORT=9000
# Expose the port so our computer can access it
EXPOSE 9000

CMD ["npm", "start"]