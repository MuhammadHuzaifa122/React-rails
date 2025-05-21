Rails.application.routes.draw do
  # Root route goes to welcome#index
  root "welcome#index"

  # Standard RESTful routes for todos + custom JSON route
  resources :todos, only: [ :index, :create, :new, :show, :edit, :update, :destroy ] do
    collection do
      get :all_todos_json
    end
  end

  # Rails health check (default)
  get "up" => "rails/health#show", as: :rails_health_check
end
