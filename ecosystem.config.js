module.exports = {
  apps: [
    {
      name: 'todo_test_server',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      // wait_ready: true,
      script: 'dist/main.js',
      args: 'start',
    },
  ],
};
