FROM ollama/ollama

RUN ollama serve & \
  OLLAMA_PID=$! \
  echo "Waiting for Ollama to start..." \
  sleep 10 \
  echo "Pulling llama3.1 model..." \
  ollama pull llama3.1 \
  echo "Model pulled successfully!" \
  wait $OLLAMA_PID