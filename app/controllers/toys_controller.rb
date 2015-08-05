class ToysController < ApplicationController
  def update
    @toy = Toy.find(params[:id])
    @toy.update(toy_params)
    if @toy.save
      render :show
    else
      render json: @toy.errors.full_messages, status: 422
    end
  end
  private

  def toy_params
    params.require(:toy).permit(:happiness, :name, :pokemon_id, :price)
  end
end
